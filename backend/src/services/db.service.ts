import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import { throwValidationError } from '../utils/error/mongodb-error'
import { FuncHandleService, Return } from '../utils/funcService'

export const createDoc = <T>(log: string, model: Model<T>, body: Partial<T>) =>
  FuncHandleService(log, async () => {
    const data = await model.create(body)
    return data
  })

export const docExist = <T>(
  log: string,
  model: Model<T>,
  path: string,
  exist: boolean,
  filter?: FilterQuery<T>,
  projection?: ProjectionType<T> | null,
  options?: QueryOptions<T> | null
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOne(filter, projection, options)
    if (data && exist) {
      throwValidationError(path, `${path} already exist`, true)
    } else if (!data && !exist) {
      throwValidationError(path, `${path} not found`, true)
    }
    return data
  })

export const getDoc = <T>(
  log: string,
  model: Model<T>,
  filter?: FilterQuery<T>,
  projection?: ProjectionType<T> | null,
  options?: QueryOptions<T> | null
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOne(filter, projection, options)
    return data
  })

export const getAllDocs = <T>(
  log: string,
  model: Model<T>,
  filter?: FilterQuery<T>,
  projection?: ProjectionType<T> | null,
  options?: QueryOptions<T> | null
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOne(filter, projection, options)
    return data
  })

export const deleteDoc = <T>(
  log: string,
  model: Model<T>,
  filter: FilterQuery<T>,
  options?: QueryOptions<T> | null
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOneAndRemove(filter, options)
    if (!data) {
      throwValidationError('Doc', 'Not found', true)
    }
    return data
  })

export const updateDoc = <T>(
  log: string,
  model: Model<T>,
  filter: FilterQuery<T>,
  update?: UpdateQuery<T>,
  options?: QueryOptions<T> | null
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOneAndUpdate(filter, update, options)
    if (!data) {
      throwValidationError('Doc', 'Not found', true)
    }
    return data
  })
