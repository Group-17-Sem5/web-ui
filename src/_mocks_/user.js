import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import axios from 'axios';
import { Component } from 'react';


// ----------------------------------------------------------------------


const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  userID: faker.datatype.uuid(),
  addresID: faker.datatype.uuid(),
  address: faker.address.streetName(),
  //username: faker.datatype.uuid(),
  branchID: faker.datatype.uuid(),
  phoneNumber: faker.phone.phoneNumber(),
  receivedPostID: faker.datatype.uuid(),
  sendPostID: faker.datatype.uuid(),
  receivedMoneyOrderID: faker.datatype.uuid(),
  sendMoneyOrderID: faker.datatype.uuid(),
  
  username: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer'
  ])
}));


const books =[
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
},
{
  "userId": 1,
  "id": 2,
  "title": "qui est esse",
  "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
},]

axios.get('/api/books',(req,resp)=>{
  resp.send(books)
})
export default users;
