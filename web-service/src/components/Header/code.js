import React, { Component } from 'react'
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'

import frFlag from "../../assets/img/Flag_of_France.png"
import ukFlag from "../../assets/img/Flag_of_UK.png"


export class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    render() {
        return (
            
            <div className="header"> 
                <h2 >French elections</h2>
                <Dropdown className="bg-light" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle color="dark"  caret>
                    <img src={ukFlag} alt="english language" width="30px" /> English
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem >
                      <img src={frFlag} alt="french language" width="30px" /> Français
                      </DropdownItem>
                    <DropdownItem >
                    <img src={ukFlag} alt="english language" width="30px" /> English
                    </DropdownItem>
                    
                    </DropdownMenu>
               </Dropdown>

            </div>
        )
    }
}

export default Header
/* <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              tag="span"
              onClick={this.toggle}
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen}
            >
              Language
            </DropdownToggle>
            <DropdownMenu>
              <div onClick={this.toggle}>English</div>
              <div onClick={this.toggle}>Français</div>
            </DropdownMenu>
          </Dropdown> */