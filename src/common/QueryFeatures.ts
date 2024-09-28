import { Document, QueryWithHelpers } from "mongoose";

class QueryFeatures<T extends Document> {
  mongooseQuery: QueryWithHelpers<T[], T>;
  requestQuery;
  reservedQuery: string[];
  pagination: {
    page: number;
    limit: number;
    nextPage: number;
    prevPage: number;
    totalCount: number;
    count: number;
  };

  constructor(mongooseQuery, requestQuery) {
    this.reservedQuery = [
      "sort",
      "fields",
      "limit",
      "skip",
      "search",
      "filter",
      "page",
    ];

    this.pagination = {
      page: 1,
      limit: 3,
      nextPage: null,
      prevPage: null,
      totalCount: 0,
      count: 0,
    };

    this.mongooseQuery = mongooseQuery;
    this.requestQuery = requestQuery;
  }

  sort() {
    const { sort } = this.requestQuery;

    if (sort) {
      const sortedBy: string = sort.split(",").join(" ").trim(); // createdAt, title -> createdAt title
      console.log("SORTED BY", sortedBy);

      this.mongooseQuery.sort(sortedBy);
    } else {
      this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  projection() {
    const { fields } = this.requestQuery;

    if (fields) {
      console.log("Fields", fields);

      const selectedFields = fields.split(",").join(" ").trim();
      this.mongooseQuery.select(selectedFields);
    }

    return this;
  }

  /**
   * @description Search in Documents
   * @param searchBy title or description or by multiple fields
   */
  search(searchBy: string[] = ["name"]) {
    const { search } = this.requestQuery;

    if (search) {
      console.log("SEARCH on", search);

      const searchByRegex = searchBy.reduce((obj, by) => {
        return {
          [by]: new RegExp(search, "ig"),
        };
      }, {});

      console.log("Object", searchByRegex);

      this.mongooseQuery = this.mongooseQuery.find({
        $or: [searchByRegex],
      });
    }

    return this;
  }

  async paginate() {
    const { page: _page = 1, limit: _limit = 3 } = this.requestQuery;
    const [page, limit] = [+_page, +_limit];

    const skip = (page - 1) * limit;

    console.log("PAGINATE", page, limit, skip);

    const countDocuments = await this.mongooseQuery
      .clone()
      .countDocuments()
      .exec();

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    const currentCount = (await this.mongooseQuery.clone()).length;

    console.log("Count Documents", countDocuments);

    this.pagination = {
      page: page,
      limit: limit,
      nextPage: Math.ceil(countDocuments / limit) > page ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,

      totalCount: countDocuments,
      count: currentCount,
    };

    return this;
  }

  filteration() {
    const filterQueries = { ...this.requestQuery };
    this.reservedQuery.forEach((q) => delete filterQueries[q]);

    if (Object.values(filterQueries).length === 0) return this;
    console.log("filter Query", filterQueries);

    let filterQueriesJsonified = JSON.stringify(filterQueries);
    filterQueriesJsonified = filterQueriesJsonified.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    console.log("JSONIFIED", filterQueriesJsonified);

    const filterQueriesObject = JSON.parse(filterQueriesJsonified);

    this.mongooseQuery.find(filterQueriesObject);

    return this;
  }

  all() {
    return this.projection().search().filteration().sort();
  }
}

export default QueryFeatures;
