class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }


    search() {
        const keyword = this.queryStr.keyword ? {
            title: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            },
        } : {}
        const keyword2 = this.queryStr.keyword ? {
            'keywords.keyword': {
                $regex: this.queryStr.keyword,
                $options: 'i'
            },
        } : {}
        this.query = this.query.find({ ...keyword, ...keyword2 });
        return this;
    }
    searchKey() {
        const keyword = this.queryStr.keyword2 ? {
            'keywords.keyword': {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }
    searchCourse() {
        const department = this.queryStr.department ? {
            department: {
                $regex: this.queryStr.department,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...department });
        return this;
    }

    filter() {

        const queryCopy = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures