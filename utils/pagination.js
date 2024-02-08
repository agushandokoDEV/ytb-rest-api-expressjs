const paginate = async (model, page = 1, per_page = 10, order = [['created_at', 'desc']], where = {}, search = '',include=[]) => {
    try {
        const offset = (page - 1) * per_page;

        const conditions = {
            ...where,
        };

        if (search !== '') {
            conditions[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
            ];
        }

        const { count, rows } = await model.findAndCountAll({
            where: conditions,
            order,
            offset,
            limit: per_page,
            include
        });

        const total_page = Math.ceil(count / per_page);

        return {
            list: rows,
            meta: {
                current_page: page,
                total_page,
                total: count,
                per_page:per_page,
            },
        };
    } catch (error) {
        throw new Error(`Pagination error: ${error.message}`);
    }
};

module.exports = { paginate };
