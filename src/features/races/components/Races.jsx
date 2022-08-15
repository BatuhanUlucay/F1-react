import { useRaces } from "../api/getRaces";

export const Races = () => {

    const racesQuery = useRaces("2022", "4");



    if(racesQuery.isLoading){
        return <h1>Loading</h1>
    }

    else{

        console.log(racesQuery.data);

        return <h1>Loaded.</h1>
    }

}