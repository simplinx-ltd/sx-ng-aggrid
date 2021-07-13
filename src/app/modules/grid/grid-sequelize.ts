import { gridSortFormatter, ISortModel } from './grid-sequelize-sort';
import { gridFilterFormatter, IFilterModel } from './grid-sequelize-filter';
import { IIncludeModelItem, gridIncludeFormatter } from './grid-sequelize-include';

export function gridSequelizeFormatter(
    initialSortModel: ISortModel[],
    staticFilterModel: IFilterModel,
    includeModel: IIncludeModelItem[],
    currentPageNumber?: number,
    pageRowCount?: number,
    sortModel?: ISortModel[],
    filterModel?: IFilterModel): any {
    const params: any = {
        offset: currentPageNumber > 0 ? (currentPageNumber - 1) * pageRowCount : 0,
        limit: pageRowCount,
        order: gridSortFormatter(initialSortModel, sortModel),
    };
    const where = gridFilterFormatter(staticFilterModel, filterModel);
    const include = gridIncludeFormatter(includeModel, filterModel);
    if (!params.order) {
        delete params.order;
    }
    if (!params.limit) {
        delete params.limit;
    }
    if (where) {
        params.where = where;
    }
    if (include) {
        params.include = include;
    }
    return params;
}
