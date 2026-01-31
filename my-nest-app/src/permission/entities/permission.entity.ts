import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from '../../application/entities/application.entity';
import { User } from '../../user/entities/user.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'uuid' })
  applicationId: string;

  @ManyToOne(() => Application, (application) => application.permissions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @ManyToMany(() => User, (user) => user.permissions)
  users: User[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
