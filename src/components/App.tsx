import React, { useRef } from 'react';
import ParamEditor, { Param, Model } from './ParamEditor';

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  const paramEditorRef = useRef<ParamEditor>(null);

  const handleModelUpdate = () => {
    if (paramEditorRef.current) {
      const updatedModel = paramEditorRef.current.getModel();
      console.log('Обновленная модель:', updatedModel);
    }
  };

  return (
    <div>
      <ParamEditor ref={paramEditorRef} params={params} model={initialModel} />
      <button onClick={handleModelUpdate}>
        Получить обновленную модель
      </button>
    </div>
  );
};

export default App;