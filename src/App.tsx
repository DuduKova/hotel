import * as React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";

class App extends React.Component {
    public render() {
        return (
            <div>
                <Dashboard />
                <hr/>
                <div className='container'>
                    <EmployeeList/>
                </div>
            </div>
        );
    }
}

export default App;
