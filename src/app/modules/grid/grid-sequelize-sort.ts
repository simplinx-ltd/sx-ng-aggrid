export interface ISortModel {
    colId: string;
    sort: string;
}

export function gridSortFormatter(initialSortModel: ISortModel[], gridSortModel: ISortModel[]): string {
    const formattedSort = [];
    let sortModel: ISortModel[] = initialSortModel;
    if (gridSortModel && Array.isArray(gridSortModel) && gridSortModel.length > 0) {
        sortModel = gridSortModel;
    }
    if (!sortModel || !Array.isArray(sortModel)) {
        return null;
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < sortModel.length; i++) {
        formattedSort.push([sortModel[i].colId, sortModel[i].sort.toUpperCase()]);
    }
    return JSON.stringify(formattedSort);
}
