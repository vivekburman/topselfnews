import React, { Component } from 'react';
import menu from '../../../images/menu.svg';
import close from '../../../images/close.svg';
import { connect } from 'react-redux';
import { openAccordian, closeAccordian } from '../../../reducers/click/accordian.action';
class AccordianIconComponent extends Component {
    render() {
        const { hasResized = false, collapseAccordian, expandAccordian, isOpen, hasWindowResized } = this.props;
        if (hasWindowResized !== hasResized) {
            
        }
        const showAccordianIcon = "icon-img " + (isOpen ? 'close-icon' : 'open-icon'),
            showCloseIcon = "icon-img " + (isOpen ? 'open-icon' : 'close-icon'); 
        return (
            <figure className='show-accordian-icon figure'>
                <img src={menu} alt="accordian" className={showAccordianIcon} onClick={expandAccordian}/>
                <img src={close} alt="accordian" className={showCloseIcon} onClick={collapseAccordian} />
            </figure>
        );
    }
}
const mapStateToProps = state => ({
    isOpen: state.accordian.isOpen
});
const mapDispatchToProps = (dispatch) => ({
    collapseAccordian: (e) => dispatch(closeAccordian(e)),
    expandAccordian: (e) => dispatch(openAccordian(e))
});
export default connect(mapStateToProps, mapDispatchToProps)(AccordianIconComponent);