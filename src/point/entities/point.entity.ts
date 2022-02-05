import { ObjectType } from '@nestjs/graphql'
import { Entity } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

@Entity('point')
@ObjectType({
  implements: () => [BaseEntity],
})
export class PointEntity extends BaseEntity {}
