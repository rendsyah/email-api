import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class NotificationMessage {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int', nullable: true, default: null })
    event_id: number;

    @Column({ type: 'int', nullable: true, default: null })
    media_id: number;

    @Column({ type: 'text', default: '' })
    message: string;

    @Column({ type: 'varchar', length: 100, nullable: true, default: null })
    subject: string;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @Column({ type: 'smallint', default: 0 })
    is_deleted: number;

    @Column({ type: 'timestamp', nullable: true, default: null })
    deleted_at: Date;

    @Column({ type: 'timestamp', nullable: true, default: Timestamp })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true, default: Timestamp })
    updated_at: Date;
}
