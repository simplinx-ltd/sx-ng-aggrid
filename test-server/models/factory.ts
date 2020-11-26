import { OnOffStatus } from '../enum/OnOffStatus';
import { Table, Column, Model, DataType} from 'sequelize-typescript';


@Table({
    tableName: 'factory',
    modelName: 'factory',
    freezeTableName: true,
})
export default class Factory extends Model<Factory> {
    @Column({
        type: DataType.TEXT,
        allowNull:false,
        unique:true
    })
    name: Date;

    @Column({
        type: DataType.TEXT,
    })
    comment: string;

    @Column({
        type: DataType.ENUM(OnOffStatus.Off,OnOffStatus.On),
        allowNull: false,
    })
    status: OnOffStatus;
}