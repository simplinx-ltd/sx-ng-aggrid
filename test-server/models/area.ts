import { OnOffStatus } from '../enum/OnOffStatus';
import { Table, Column, Model, DataType, ForeignKey,BelongsTo} from 'sequelize-typescript';
import Factory from './factory';


@Table({
    tableName: 'area',
    modelName: 'area',
    freezeTableName: true,
})
export default class Area extends Model<Area> {
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

    @ForeignKey(() => Factory)
    @Column
    factoryId: number;

    @BelongsTo(() => Factory)
    factory: Factory;
}