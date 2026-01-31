import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Permission, (permission) => permission.application, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  permissions: Permission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
