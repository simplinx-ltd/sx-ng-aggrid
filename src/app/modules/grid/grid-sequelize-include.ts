import { gridFilterFormatter, IFilterModel } from './grid-sequelize-filter';

export interface IIncludeModelItem {
    model: string;
    attributes?: string[];
    where?: any;
}

export function gridIncludeFormatter(includeModel: IIncludeModelItem[], filterModel: IFilterModel): string {
    if (!includeModel) {
        return null;
    }
    if (!filterModel) {
        return JSON.stringify(includeModel);
    }

    const includeModelCopy = JSON.parse(JSON.stringify(includeModel));
    Object.keys(filterModel).forEach((key) => {
        if (key.indexOf('.') < 0) {
            return;
        }
        const modelName = key.substring(0, key.indexOf('.'));
        const fieldName = key.substring(key.indexOf('.') + 1);
        for (let i = 0; i < includeModel.length; i++) {
            if (modelName === includeModel[i].model) {
                let filter = filterModel[key];
                includeModelCopy[i].where = JSON.parse(gridFilterFormatter({}, { [fieldName]: filter }));
            }
        }
    });

    return JSON.stringify(includeModelCopy);
}
