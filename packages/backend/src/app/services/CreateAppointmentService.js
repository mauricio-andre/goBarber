import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';
import Cache from '../../lib/Cache';

class CreateAppointmentService {
  async run({ providerId, userId, date }) {
    /**
     * Check that the provider ID is the same as the user ID
     */
    if (providerId === userId) {
      throw new Error('The provider ID cannot be the same as the user ID');
    }

    /**
     * Check if providerId is a provider
     */
    const isProvider = await User.findOne({
      where: {
        id: providerId,
        provider: true,
      },
    });

    if (!isProvider) {
      throw new Error('You can only create appointments with providers');
    }

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      throw new Error('Past dates are not permitted');
    }

    /**
     * Check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        providerId,
        canceledAt: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      throw new Error('Appointment date is not available');
    }

    const appointment = await Appointment.create({
      userId,
      providerId,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(userId);
    const formatDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formatDate}`,
      user: providerId,
    });

    /**
     * Invalidate cache
     */
    Cache.invalidatePrefix(`user:${userId}:appointments`);

    return appointment;
  }
}

export default new CreateAppointmentService();
