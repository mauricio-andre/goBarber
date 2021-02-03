import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

class ProviderController {
  async index(req, res) {
    const cached = await Cache.get('providers');

    if (cached) {
      return res.json(cached);
    }

    const provider = await User.findAll({
      where: {
        provider: true,
      },
      attributes: ['id', 'name', 'email', 'avatarId'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    await Cache.set('providers', provider);

    return res.json(provider);
  }
}

export default new ProviderController();