import {useCallback, useEffect, useState} from 'react';
import {owners as owners_data} from '../../../../data/DUMMYDATA';
import Owner from '../../../../data/classes/Owner';
import AnimalForm from "../../../../components/Functional/AnimalForm";
import OwnerService from "../../../../functional/OwnerService";
import LoadingSpinner from "../../../../components/Style/LoadingSpinner";
import {useData} from "../../../../functional/DataContext";
import {getStaticPathsOwner} from "../../../../functional/RouterService";

export default function OwnerAnimalAdd(props) {
    const [owner, setOwner] = useState(null);

    const updateData = useCallback(async () => {
            const ownerResponse = await OwnerService.getOwnerDetail(props.ownerId);
            const ownerData = ownerResponse.data;
            const newOwner = Owner.fromJSON(ownerData);
            setOwner(newOwner);
        }
        , [props.ownerId]);

    useEffect(() => {
            updateData().then(() => {
                console.log("Data updated", new Date().getTime());
            }).catch(error => {
                    console.log(error);
                }
            );
        }
        , [updateData]);

    return (
        <div>{!!owner ?
            <>
                <h1>Owner Add Animal for ({owner.id}) {owner.fullName}</h1>
                <AnimalForm fromOwner={true} owner={owner}/></> : <LoadingSpinner/>}
        </div>
    );
}

export async function getStaticPaths() {
    return await getStaticPathsOwner();
}

export async function getStaticProps(context) {
    return {
        props: {
            ownerId: context.params.id
        }
    }
}
