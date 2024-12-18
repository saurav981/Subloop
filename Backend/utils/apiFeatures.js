class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Making shallow copy of 'queryString' object
    const queryObject = { ...this.queryString };
    // 'Properties/fields' we want to exclude from query object
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    // Delete all 'excludeFields' properties from 'queryObject'
    excludeFields.forEach((el) => delete queryObject[el]);

    // Convert to JSON
    let queryStr = JSON.stringify(queryObject);
    // Put a $ sign before comparison operaters like: gte, gt, lte, lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // "this.query" points to Tour in "Tour.find()" or whichever model the class was used on
    // Converting JSON to object
    this.query = this.query.find(JSON.parse(queryStr));

    // 'this' returns the entire object
    return this;
  }

  // Sort
  sort() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // Fields and Limit
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // Page
  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 1000;
    const skipValue = (page - 1) * limit;

    this.query = this.query.skip(skipValue).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
