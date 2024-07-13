import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<img src="https://i.blogs.es/2cc78a/ordenstarwars/1366_2000.jpg" 
			style={{ width: '1300px', height: 'auto' }} />
		</div>
	);
};
