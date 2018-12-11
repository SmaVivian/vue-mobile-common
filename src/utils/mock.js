import Mock from 'mockjs';

const baseURL = process.env.BASE_API;

// let obj={
//   'host':'www.baidu',
//   'port':'12345',
//   'node':'selector'
// }
// let arr=['momo','yanzi','ziwei']

Mock.mock(baseURL + '/demo', {
  'name|3': 'fei',//这个定义数据的模板形式下面会介绍
  'age|20-30': 25,
});

Mock.mock(baseURL + '/demo/list', {
  "array|1-10": [
    {
      "name|+1": [
        "Jane",
        "Vivi",
        "张三"
      ],
      "age|+1": [
        "24",
        "25",
        "26"
      ]
    }
  ]
});