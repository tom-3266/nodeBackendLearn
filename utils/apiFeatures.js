class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const equeryVals = { ...this.queryString };
    const excludedVals = ['page', 'sort', 'limit', 'fields'];
    excludedVals.forEach(el => delete equeryVals[el]);

    //Advanced Filtering
    let queryStr = JSON.stringify(equeryVals);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortby);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.field) {
      const field = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(field);
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
