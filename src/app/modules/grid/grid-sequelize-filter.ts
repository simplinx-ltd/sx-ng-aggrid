export interface IFilter {
    filter: string | number;
    filterTo?: number;
    dateFrom?: string;
    dateTo?: string;
    filterType: string;
    type: string;
}

export interface IFilterModel {
    [index: string]: IFilter;
}

export function gridFilterFormatter(staticFilterModel: IFilterModel, gridFilterModel: IFilterModel): string {
    if (!staticFilterModel && !gridFilterModel) {
        return undefined;
    }

    const formattedFilter: any = {};
    const filterModel: IFilterModel = Object.assign(gridFilterModel, staticFilterModel);
    Object.keys(filterModel).forEach((key) => {

        // If we have a object notation '.' do nothing
        // This will be handled in include params
        if (key.indexOf('.') > 0) {
            return;
        }

        const filter = filterModel[key];
        switch (filter.filterType) {
            case 'text':
                formattedFilter[key] = textFilterFormatter(filter);
                break;
            case 'number':
                formattedFilter[key] = numberFilterFormatter(filter);
                break;
            case 'date':
                formattedFilter[key] = dateFilterFormatter(filter);
                break;
            default:
                console.error(`Unsupported filter type ${filter.filterType}`);
                break;
        }
    });
    return JSON.stringify(formattedFilter);
}

function textFilterFormatter(filter: IFilter): any {
    switch (filter.type) {
        case 'equals':
            return filter.filter;
        case 'notEqual':
            return { $ne: filter.filter };
        case 'contains':
            return { $like: '%' + filter.filter + '%' || '%' };
        case 'notContains':
            return { $notLike: '%' + filter.filter + '%' || '%' };
        case 'startsWith':
            return { $like: filter.filter + '%' || '%' };
        case 'endsWith':
            return { $like: '%' + filter.filter || '%' };
        default:
            console.error(`Unsupported filter type ${filter.type} for text`);
    }
}

function numberFilterFormatter(filter: IFilter): any {
    switch (filter.type) {
        case 'equals':
            return filter.filter;
        case 'notEqual':
            return { $ne: filter.filter };
        case 'lessThan':
            return { $lt: filter.filter };
        case 'lessThanOrEqual':
            return { $lte: filter.filter };
        case 'greaterThan':
            return { $gt: filter.filter };
        case 'greaterThanOrEqual':
            return { $gte: filter.filter };
        case 'inRange':
            return { $between: [filter.filter, filter.filterTo] };

        default:
            console.error(`Unsupported filter type ${filter.type} for number`);
    }
}

function dateFilterFormatter(filter: IFilter): any {
    switch (filter.type) {
        case 'equals':
            return filter.dateFrom;
        case 'notEqual':
            return { $ne: filter.dateFrom };
        case 'lessThan':
            return { $lt: filter.dateFrom };
        case 'greaterThan':
            return { $gt: filter.dateFrom };
        case 'inRange':
            return { $between: [filter.dateFrom, filter.dateTo] };

        default:
            console.error(`Unsupported filter type ${filter.type} for date`);
    }
}
