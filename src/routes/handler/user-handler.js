const logger = require('../../utils/logger');
const ApiHandler = require('../../common/api-handler');
const UserRepository = require('../../repositories/user-repository');

class UserHandlers extends ApiHandler {
  constructor(logger) {
    super(logger);
    this.userRepository = new UserRepository(logger);
    this.getUsers = this.getUsers.bind(this);
  }

  async getUsers(req, res) {
    try {
      const {
        direction = 'asc',
        sort = 'name',
        page = 0,
        perPage = 50
      } = req.query;
      let filter = {};
      logger.info(`accessing to user data source repository`);
      let result = await this.userRepository.paged(filter, page, perPage)
      res.status(200);
      res.json({
        data: result,
        metadata: {
          page: Number(page),
          perPage: Number(perPage),
          total: result.total
        }
      });
    } catch (error) {
      logger.info('error', error);
    }
  }
}

module.exports = UserHandlers;
