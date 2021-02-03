import { isBefore, subHours } from 'date-fns';

import User from '../models/User';
import Appointment from '../models/Appointment';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
import Cache from '../../lib/Cache';

class CancelAppointmentService {
  async run({ providerId, userId }) {
    const appointment = await Appointment.findByPk(providerId, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.userId !== userId) {
      throw new Error("You don't have permission to cancel this appointment.");
    }

    const dateSubHours = subHours(appointment.date, 2);
    if (isBefore(dateSubHours, new Date())) {
      throw new Error('You can only cancel appointments 2 hours in advance.');
    }

    appointment.canceledAt = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, { appointment });

    /**
     * Invalidate cache
     */
    Cache.invalidatePrefix(`user:${userId}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
