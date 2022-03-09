import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Deatail from './pages/Detail/Deatail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import TodoList from './pages/TodoList/TodoList';
import TodoListRFC from './pages/TodoList/TodoListRFC';
import TodoListRedux from './pages/TodoList/TodoListRedux';
import BaiTapTodoListSaga from './pages/BaiTapTodoListSaga/BaiTapTodoListSaga';
import LoadingComponent from './components/Common/Loading/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import UserLoginTemplate from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { ADD_HISTORY } from './redux/types/HistoryTypes';
import CyberBugsTemplate from './templates/HomeTemplate/CyberBugsTemplate';
import DetailCyberBugs from './redux/_sagas/CyberBugs/indexCyberBugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/ProjectManagement/ProjectManagement';
import DrawerCyberBugs from './HOC/CyberBugsHOC/DrawerCyberBugs';



function App() {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADD_HISTORY,
      history
    })
  }, []);

  return (
    <>

      {/* <Modal /> */}
      <LoadingComponent />
      <DrawerCyberBugs />
      <Switch>
        {/* Thay thể Route Home = HOC HomeTemplate */}
        {/* <Route exact path='/home' render={(propsRoute) => {
          return <div>
            <Header />
            <Home {...propsRoute} />
          </div>
        }} /> */}
        <HomeTemplate path='/home' exact Component={Home} />

        {/* <Route exact path='/contact' render={(propsRoute) => {
          return <div style={{ backgroundColor: '#fff' }}>
            <Contact {...propsRoute} />
          </div>
        }} /> */}
        <HomeTemplate path='/contact' exact Component={Contact} />

        <HomeTemplate exact path='/about' Component={About} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <HomeTemplate exact path='/detail/:id' Component={Deatail} />
        <HomeTemplate exact path='/profile' Component={Profile} />
        <HomeTemplate exact path='/todolistrfc' Component={TodoListRFC} />
        <HomeTemplate exact path='/todolistrcc' Component={TodoList} />
        <HomeTemplate exact path='/todolistredux' Component={TodoListRedux} />
        <HomeTemplate exact path='/todolistsaga' Component={BaiTapTodoListSaga} />
        <HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal} />
        <CyberBugsTemplate exact path='/cyberbugs' Component={DetailCyberBugs} />
        <CyberBugsTemplate exact path='/createproject' Component={CreateProject} />
        <CyberBugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <CyberBugsTemplate exact path='/projectdetail/:projectId' Component={DetailCyberBugs} />
        {/* root mặc định */}
        <CyberBugsTemplate exact path='/' Component={ProjectManagement} />
        {/* route mặc định khi người dùng nhập url không khớp với bất kỳ route nào */}
        <HomeTemplate path='*' Component={PageNotFound} />
      </Switch>

    </>

  );
}

export default App;
