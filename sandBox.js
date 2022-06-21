const crud = require('./crud');

async function searchDatas(){
  const datas = await crud.get('people');
  console.log(datas);
}

async function searchDataById(){
  const data = await crud.getById('people', 'CUNQQo96d8fAayFXSNoI');
  console.log(data);
}

async function remove(){
  const data = await crud.remove('people', 'CUNQQo96d8fAayFXSNoI');
  console.log(data);
}

remove();