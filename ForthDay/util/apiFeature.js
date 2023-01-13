class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filters() {
    //Filter types 1 using mongoose command
    // const tours1 = await Tour.find()
    //   .where('difficulty')
    //   .equals('medium')
    //   .where('duration')
    //   .gt(5);
    // type 2 -> directly pass query string object into find method
    // 1.A) Filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    let queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((x) => delete queryObj[x]);
    // 1.B) Advance filtering
    queryObj = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    // above code do like this duration[gte]=5&ratingsAverage[gte]=4.5 => find({"ratingsAverage":{"$gt":"4.6"}})
    this.query = this.query.find(JSON.parse(queryObj));
    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryString.sort) {
      const sortConditions = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortConditions);
      // 1)default it returns assending order => sort=price
      // 2)decending order =>  sort=-price
      // 3)filter more than one field => sort=price duration AnyOtherField
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  fieldLimit() {
    // 3) limiting Fields
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    // 4) pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const count = await Tour.countDocuments();
    //   if (skip > count) {
    //     throw new Error('This page / Data does not exists');
    //   }
    // }
    return this;
  }
}

module.exports = APIFeatures;
