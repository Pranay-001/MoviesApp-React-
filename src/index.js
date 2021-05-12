import React from 'react';
// import {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers'
import thunk from 'redux-thunk'  
import {Provider} from 'react-redux'

//middleware (currying)
//logger(obj)(next)(action)
// const logger = function({dispatch,getState}){
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE = ',action.type)
//       next(action);
//     }
//   }
// }

const logger = ({dispatch,getState})=>(next)=>(action)=>{
  //logger code
  // if(typeof action===function)
  // console.log('ACTION_TYPE = ',action.type);
  next(action);
}

// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//   if(typeof action==='function'){
//     action(dispatch);
//     return;  
//   }
//   next(action);
// }

const store=createStore(rootReducer,applyMiddleware(logger,thunk))
// console.log('store',store.getState())

// const StoreContext=createContext();

// export function connect(callback){
//   return function (Component){
//     class ConnectedComponent extends React.Component{
//       constructor(props){
//         super(props);
//         this.unsubscribe=this.props.store.subscribe(()=>{
//             this.forceUpdate();
//           });
//       }
//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render(){
//         // console.log('dataToBePassed',this.props)
//         const {store}=this.props;
//         const state=store.getState();
//         const dataToBePassed=callback(state);
        
//         return (<Component {...dataToBePassed} 
//                 dispatch={store.dispatch}>
//                 </Component>
//               ) 
//       }
//     }
//     class ConnectedComponentWraper extends React.Component{
//       render(){
//         return (
//           <StoreContext.Consumer >
//             {(store)=><ConnectedComponent store={store}/>}
//           </StoreContext.Consumer>
//         )
//       }
//     }
//     return ConnectedComponentWraper;
//   }
// }

// class Provider extends React.Component{
//   render(){
//     const {store} = this.props
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>

//     )
//   }
// }

ReactDOM.render(  
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

