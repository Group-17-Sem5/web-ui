import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const moneyorders = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  moneyOrderID: faker.datatype.uuid(),
  addressID: faker.datatype.uuid(),
  date: faker.date.past,
  assignedPostmanID: faker.datatype.uuid(),
  sourceBranchID: faker.datatype.uuid(),
  receivingBranchID: faker.datatype.uuid(),
  senderID: faker.datatype.uuid(),
  receiverID: faker.datatype.uuid(),
  //isConfirmed: faker.datatype.boolean(),
  status: sample(['confirmed', 'active']),
  amount: sample([
    'Rs.100',
    'Rs.97',
    'Rs.45',
    'Rs.33',
    'Rs.87'
  ])
}));

export default moneyorders;
