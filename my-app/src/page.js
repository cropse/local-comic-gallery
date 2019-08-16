import React, { useState, useEffect, useCallback } from 'react';
import { Gallerybundle } from './gallery.js'

const staticUrl = 'http://localhost:8888'

function makePromis(url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch(url, { headers: headers }).then((result) => {
        return result.json()
    })
}
export function MainList(props) {
    const [photos, setPhotos] = useState([])
    const [mainPhotos, setMainPhotos] = useState([])
    const [isMainPage, setIsMainPage] = useState(true)

    const onClick = useCallback(async (event, { photo, index }) => {
        console.log(staticUrl + '/' + encodeURIComponent(photo.key) + '/')
        const result = await makePromis(staticUrl + '/' + encodeURIComponent(photo.key) + '/')
        result.sort((a, b) => { return a.name.split(".")[0] - b.name.split(".")[0] })

        setPhotos(result.map((e) => {
            return {
                src: staticUrl + '/' + encodeURIComponent(photo.key + '/' + e.name),
                width: 3,
                height: 4,
                key: e.name.split(".")[0]
            }
        }));

        setIsMainPage(false)
    }, []);
    const goback = () => {
        setIsMainPage(true)
    }
    useEffect(() => {
        async function getMainPhoto() {
                let result = await makePromis(staticUrl)
                result = result.filter((item, index, array) => {
                    return item.type === "directory"
                })
                setMainPhotos(result.map((e) => {
                    return {
                        src: staticUrl + '/' + encodeURIComponent(e.name) + '/1.jpg',
                        width: 3,
                        height: 4,
                        key: e.name,
                    }
                }))
        }
        if(isMainPage){
            getMainPhoto()
        }
    }, [isMainPage]);

    return <div>
        {isMainPage ? null : <button onClick={goback}>Go Back!!</button>}
        <Gallerybundle photos={isMainPage ? mainPhotos : photos} onClick={onClick} isMainPage={isMainPage} />
    </div>;
}