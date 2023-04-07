import React, { useEffect, useState } from "react";
import supplyAPI from "./API/supplyAPI";
import ResponsivePagination from 'react-responsive-pagination';
import "./App.css"

const App = () => {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 97;
    const [category, setCategory] = useState([]);
    const [channel, setChannel] = useState([]);
    const [state, setState] = useState({});
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(state[0]);
    const [open2, setOpen2] = useState(false);
    const [select2, setSelect2] = useState(channel[0]);
    const [open3, setOpen3] = useState(false);
    const [select3, setSelect3] = useState(category[0]);

    // first api call 
    useEffect(() => {
        const suppliers = async () => {
            const res = await supplyAPI.get(`/list/supply?_page_number=${currentPage}`);
            const res2 = await supplyAPI.get("/unique/supply/category");
            const res3 = await supplyAPI.get("/unique/supply/channel");
            const res4 = await supplyAPI.get("/unique/supply/state");
            setList(res.data.data);
            setCategory(res2.data.data);
            setChannel(res3.data.data);
            setState(res4.data.data);
        };
        suppliers()
    }, [currentPage]);

    // filtered api calls 
    useEffect(() => {
        const states = async () => {
            if (select !== null) {
                const res5 = await supplyAPI.get(`/list/supply?_page_number=${currentPage}&state=${select}`);
                setList(res5.data.data);
            }
        }
        states();
    }, [select, currentPage]);
    useEffect(() => {
        const states = async () => {
            if (select2!== null) {
                const res6 = await supplyAPI.get(`/list/supply?_page_number=${currentPage}&channel=${select2}`);
                setList(res6.data.data);
            }
        }
        states();
    }, [select2, currentPage]);

    useEffect(() => {
        const states = async () => {
            if (select3 !== null) {
                const res7 = await supplyAPI.get(`/list/supply?_page_number=${currentPage}&category=${select3}`);
                setList(res7.data.data);
            }
        }
        states();
    }, [select3, currentPage]);

       //  rendering cards 
    const renderedList = list.map((items,i) => {
        return (
            <div className="ui raised card" key={i}>
                <div className="ui content c1"><div className="header"> {items.state !== "" ? items.state : <span className="s1">State Data Unavailable</span>}</div>
                    <div className="meta"> {items.district !== "" ? items.district : <span className="s2">District Data Unavailable</span>}</div> </div>
                <div className="ui content c2">
                    <div className="description">
                        <div className="ui centered header"><h5><u>Details</u></h5></div>
                        <div className="ui bulleted list">
                            <div className="item"><b>Channel :</b> {items.channel}</div>
                            <div className="item"><b>Category :</b> {items.category}</div>
                            <div className="item i2"><b>Description :</b> <i>{items.request_description}</i></div>
                            <div className="item"><b>Contact :</b> {items.contact_numbers.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    <div className="description">{items.source_time}</div>
                </div>
            </div>
        )
    })
    return (
        <div>

            {/* Header */}
            <div className="ui menu">
                <div className="left menu">
                    <div className="item"><h3>Supplies</h3></div>
                </div>
                <div className="right menu">
                    <div className="item">
                        <label className="ui label l1">Filter By State</label>
                        <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? "visible active" : ""}`}>
                            <i className="dropdown icon"></i>
                            <div className="text">{select}</div>
                            <div className={`menu ${open ? "visible transition" : ""}`}>
                                {Object.keys(state).map((key, i) => {
                                    return (
                                        <div className="item"
                                            key={i}
                                            onClick={() => setSelect(key)}>
                                            {key}
                                        </div>
                                    )
                                })};
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <label className="ui label l1">Filter By Channel</label>
                        <div onClick={() => setOpen2(!open2)} className={`ui selection dropdown ${open2 ? "visible active" : ""}`}>
                            <i className="dropdown icon"></i>
                            <div className="text">{select2}</div>
                            <div className={`menu ${open2 ? "visible transition" : ""}`}>
                                {Object.keys(channel).map((key, i) => {
                                    return (
                                        <div className="item"
                                            key={i}
                                            onClick={() => setSelect2(key)}>
                                            {key}
                                        </div>
                                    )
                                })};
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <label className="ui label l1">Filter By Category</label>
                        <div onClick={() => setOpen3(!open3)} className={`ui selection dropdown ${open3 ? "visible active" : ""}`}>
                            <i className="dropdown icon"></i>
                            <div className="text">{select3}</div>
                            <div className={`menu ${open3 ? "visible transition" : ""}`}>
                                {Object.keys(category).map((key, i) => {
                                    return (
                                        <div className="item"
                                            key={i}
                                            onClick={() => setSelect3(key)}>
                                            {key}
                                        </div>
                                    )
                                })};
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* cards  */}
            <div className="ui centered stackable cards">
                {renderedList}
            </div>

            {/* pagination */}
            <div className="ui menu">
                <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>


        </div>
    )
};
export default App;