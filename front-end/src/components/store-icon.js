import React, {Component} from 'react';


class StoreIcon extends Component{

    render(){

        let descriptionBody;
        if(this.props.p.type ==="_weapon"){
            descriptionBody = (<>
            <div className='item-label'>Speed:<div className='item-value'> {this.props.p._stat_00}</div></div>
            <div className='item-label'>Damage:<div className='item-value'> {this.props.p._stat_01}-{this.props.p._stat_02}</div></div>
            <div className='item-label'>To Hit Bonus: <div className='item-value'>+{this.props.p._stat_03}</div></div></>)
        } else if (this.props.p.type === "_shield" || this.props.p.type === "_boots" || this.props.p.type === "_armor" || this.props.p.type ==="_gloves" || this.props.p.type ==="_helmet"){
            descriptionBody = (<>
                <div className='item-label'>Speed:<div className='item-value'> {this.props.p._stat_00}</div></div>
                <div className='item-label'>Absorbtion:<div className='item-value'> {this.props.p._stat_01}-{this.props.p._stat_02}</div></div>
                <div className='item-label'>AC adjustment: <div className='item-value'>+{this.props.p._stat_03}</div></div></>)
        }
        //console.log(this.props.p)
        return(
            <div >
                <form>
                    <button
                            className="button-item"
                            onClick={e => this.props.handleSubmit(e, this.props.p.item_id)}
                            type="submit"
                            >
                                <img src={"/icons2/" + this.props.p.iconfile} alt="sadness"></img>
                                <div className='item-label'><h5>{this.props.p.name}</h5></div>
                                <div className='item-label'>$<div className='item-value'>{this.props.p.cost}</div></div>
                                {descriptionBody}
                    </button>
                </form>
            </div>)

    }
}

export default StoreIcon;