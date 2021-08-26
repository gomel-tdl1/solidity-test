import {Layout} from 'antd';
import React, {ComponentType, FC, useEffect} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import './App.less';
import {withSuspense} from './hoc/withSuspense';
import Sider from "antd/es/layout/Sider";
import {Content} from 'antd/lib/layout/layout';
import {Header} from "antd/es/layout/layout";
import ConnectMetaMask from "./components/common/ConnectMetaMask/Connect";
import {AppStateType} from "./redux/redux-store";
import {connect} from "react-redux";
import {actionsAuth} from "./redux/auth-reducer";
import {compose} from 'redux';
import Navigation from "./components/NavBar/Navigation";
import Title from "antd/es/typography/Title";

const CreateNFTTokenContainer = React.lazy(() => import("./components/CreateNFTToken/CreateNFTToken"));
const ViewTokensContainer = React.lazy(() => import("./components/ViewYourTokens/ViewTokens"));
const ZombiesContainer = React.lazy(() => import("./components/Zombies/Zombies"));

type MapStateToPropsType = {
    isConnected: boolean,
}
type MapDispatchToPropsType = {
    setIsConnected: (isConnected: boolean) => void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const App: FC<PropsType> = React.memo((props) => {
    useEffect(() => {
        const isConnect = !!window.ethereum.selectedAddress
        props.setIsConnected(isConnect)
    }, [])
    return (
        <Layout className="App">
            <Header className='flex justify-end'>
                <ConnectMetaMask isConnected={props.isConnected} setIsConnected={props.setIsConnected}/>
            </Header>
            <Layout>
                <Sider width={300} theme={'dark'}>
                    <Navigation/>
                    <Title level={5} className='mt-6' style={{color: 'white'}}>
                        For transfer some token to any wallet click on TokenCard
                    </Title>

                </Sider>
                <Content>
                    <Switch>
                        <Route path='/create'
                               render={withSuspense(CreateNFTTokenContainer)}/>
                        <Route path='/view'
                               render={withSuspense(ViewTokensContainer)}/>
                        <Route path='/zombies'
                               render={withSuspense(ZombiesContainer)}/>

                        <Route path='*'
                               render={() => <Redirect to={"/create"}/>}/>
                    </Switch>
                </Content>
            </Layout>

        </Layout>
    );
})
const MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isConnected: state.auth.isConnected
})
const MainApp = compose<ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(MapStateToProps, {setIsConnected: actionsAuth.setIsConnected})
)(App)

export default MainApp;
