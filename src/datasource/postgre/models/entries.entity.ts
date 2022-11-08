import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entries {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'smallint', default: 0 })
    is_valid: number;
}
