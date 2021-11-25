/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { create, all, zeros } from "mathjs";
import { useState, useEffect } from "react";

const config = {};
const math = create(all, config);

function App() {
  const [inputMatrixWidth] = useState(8);
  const [GLCMPixels] = useState(8);

  const [inputMatrix, setInputMatrix] = useState(math.randomInt([8, 8], 0, 7));

  const [distance, setDistance] = useState(1);
  const [angle, setAngle] = useState(0);

  const [GLCMMatrix, setGLCMMatrix] = useState(math.matrix());

  const calculateGLCM = (inputMatrix, distance, angle) => {
    if (inputMatrix.length > 0) {
      let firstFilteredMatrix;
      let secondFilteredMatrix;
      let glcm = math.matrix(zeros(GLCMPixels, GLCMPixels));
      switch (angle) {
        case 0: // Angle 0deg
          firstFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(0, inputMatrixWidth),
              math.range(0, inputMatrixWidth - distance)
            )
          );
          secondFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(0, inputMatrixWidth),
              math.range(distance, inputMatrixWidth)
            )
          );
          break;
        case 1: // Angle 45deg
          firstFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(distance, inputMatrixWidth),
              math.range(0, inputMatrixWidth - distance)
            )
          );
          secondFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(0, inputMatrixWidth - distance),
              math.range(distance, inputMatrixWidth)
            )
          );
          break;
        case 2: // Angle 90deg
          firstFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(distance, inputMatrixWidth),
              math.range(0, inputMatrixWidth)
            )
          );
          secondFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(0, inputMatrixWidth - distance),
              math.range(0, inputMatrixWidth)
            )
          );
          break;
        case 3: // Angle 135deg
          firstFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(distance, inputMatrixWidth),
              math.range(distance, inputMatrixWidth)
            )
          );
          secondFilteredMatrix = math.subset(
            inputMatrix,
            math.index(
              math.range(0, inputMatrixWidth - distance),
              math.range(0, inputMatrixWidth - distance)
            )
          );
          break;
        default:
          break;
      }
      if (
        math.size(firstFilteredMatrix) !== [] &&
        math.size(secondFilteredMatrix) !== []
      ) {
        let glcm1 = zip(
          math.flatten(firstFilteredMatrix),
          math.flatten(secondFilteredMatrix)
        );
        console.log(firstFilteredMatrix);
        console.log(secondFilteredMatrix);
        for (let index = 0; index < glcm1.length; index++) {
          glcm.subset(
            math.index(glcm1[index][0], glcm1[index][1]),
            glcm.subset(math.index(glcm1[index][0], glcm1[index][1])) + 1
          );
        }
        setGLCMMatrix(glcm);
      }
    }
  };

  function zip() {
    var args = [].slice.call(arguments);
    var longest = args.reduce(function (a, b) {
      return a.length > b.length ? a : b;
    }, []);

    return longest.map(function (_, i) {
      return args.map(function (array) {
        return array[i];
      });
    });
  }

  useEffect(() => {
    calculateGLCM(inputMatrix, distance, angle);
  }, [inputMatrix, distance, angle]);

  return (
    <div className="App">
      <h1>GLCM Matrix Calculation</h1>
      <div className="container">
        <h2>Input Matrix</h2>
        <div class="matrixtable">
          {inputMatrix.map((row, i) => (
            <div class="vector" key={i}>
              {row.map((col, j) => (
                <div key={j}>{col}</div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={() => setInputMatrix(math.randomInt([8, 8], 0, 7))}
          >
            Randomize
          </button>
        </div>
        <div>
          <h2>Output GLCM</h2>
          <label>
            Select Distance:
            <select
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value, 10))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Select Angle:
            <select
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value, 10))}
            >
              <option value="0">0</option>
              <option value="1">45</option>
              <option value="2">90</option>
              <option value="3">135</option>
            </select>
          </label>
        </div>
        <div class="matrixtable">
          {GLCMMatrix._data.map((row, i) => (
            <div class="vector" key={i}>
              {row.map((col, j) => (
                <div key={j}>{col}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
