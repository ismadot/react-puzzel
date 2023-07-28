import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { getAnimalListStart } from './store/appReducer';
import { RootState } from './store/config';
import { Image } from './store/sagas/interface';

function App() {
  const [animalElements, setAnimalElments] = useState<string[][]>([]);
  const [helpFlag, setHelpFlag] = useState<boolean>(false);
  const [missCount, setMissCount] = useState<number>(0);
  const { loading, data, error } = useSelector(
    (state: RootState) => state.app.requestAnimalList,
  );
  const [animalCouples, setAnimalCouples] = useState<
    [HTMLDivElement, string][]
  >([]);
  const callAnimals = 20;
  const [couples, setCouples] = useState<string[]>([]);
  const dispatch = useDispatch();

  const messyDuplicateElemets = (arr: Image[]) => {
    let duplicatedArr: string[][] = arr
      .map(({ url, title, uuid }) => [
        [url, title, uuid],
        [url, title, uuid],
      ])
      .flat();
    let messyArr: string[][] = duplicatedArr.sort(() => Math.random() - 0.5);
    return messyArr;
  };

  const unflip = () => {
    animalCouples.forEach((element) => {
      element[0].classList.remove('flip');
    });
    setMissCount((prevState) => prevState + 1);
  };

  const handlerAnimalClick = (element: HTMLDivElement, uuid: string) => {
    if (animalCouples.length < 2) {
      element.classList.add('flip');
      const animal: [HTMLDivElement, string] = [element, uuid];
      setAnimalCouples((prevState) => [...prevState, animal]);
    }
  };

  const handlerPlayBtnClick = () => {
    dispatch(getAnimalListStart(callAnimals));
    setCouples([]);
    setMissCount(0);
  };

  useEffect(() => {
    setTimeout(() => {
      if (animalCouples.length >= 2) {
        const cartOneUuid = animalCouples[0][1];
        const cartTwoUuid = animalCouples[1][1];
        cartOneUuid !== cartTwoUuid
          ? unflip()
          : setCouples([...couples, cartTwoUuid]);
        setAnimalCouples([]);
      }
    }, 1000);
  }, [animalCouples]);

  useEffect(() => {
    if (data !== null && !loading) {
      const imagesList = data.entries.map((item) => item.fields.image);
      const imagesListMessy = messyDuplicateElemets(imagesList);
      setAnimalElments(imagesListMessy);
    }
  }, [loading, data, error]);

  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          {!loading && (
            <div className="box">
              <button className="btn" onClick={() => handlerPlayBtnClick()}>
                {data !== null ? 'Refresh 🔄' : 'Get ready for the quiz 🚧'}
              </button>
              {data !== null && animalElements.length && (
                <button className="btn" onClick={() => setHelpFlag(!helpFlag)}>
                  {'I need help 🏳️'}
                </button>
              )}
            </div>
          )}
        </div>
          {data === null && loading && (
            <>
            <div className="row col-xs-12 center-xs">
              <div className="col-xs-4">
                  <h1 className="rotate">🔄</h1>
                  <h2>loading...</h2>
              </div>

            </div>
            </>
          )}
        <div className="animal-list row col-xs-12">
          {data !== null && !loading && animalElements.length && (
            <>
              <div className="col-xs-12">
                <h1>
                  {couples.length === callAnimals
                    ? 'Congratulations 🎊, you win 🎉'
                    : `${couples.length} out of ${callAnimals}`}
                </h1>
                <h2>
                  {`${missCount} Miss`}
                </h2>
              </div>
              {animalElements.map(([url, title, uuid], i) => (
                <div
                  className="col-xs-4 col-sm-3 animal-card"
                  key={i}
                  onClick={(e) => handlerAnimalClick(e.currentTarget, uuid)}
                >
                  <div className="container-card">
                    <div className="flip-card">
                      <div className="inner">
                        <div className="front">
                          <img src={url} alt={title} />
                          <h1 className="tittle">{title}</h1>
                        </div>
                        <div className="back">
                          <h1 className="question">{helpFlag ? title : '⁉'}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
