const cards = [
     {
       id: 'card-1',
       title: 'Learning how to cook',
     },
     {
       id: 'card-2',
       title: 'Making sandwich',
     },
     {
       id: 'card-3',
       title: 'Taking the trash out',
     },
   ];
   
   const mockData = {
     lists: {
       'list-1': {
         id: 'list-1',
         title: 'Pendiente',
         cards,
       },
       'list-2': {
         id: 'list-2',
         title: 'Proceso',
         cards: [],
       },
       'list-3': {
         id: 'list-3',
         title: 'Finalizado',
         cards: [],
       }
     },
     listIds: ['list-1', 'list-2','list-3'],
   };
   
   export default mockData;
   