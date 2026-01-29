import { render, screen, fireEvent } from '@testing-library/react';
import ParamEditor, { Param, Model } from './ParamEditor';
import { createRef } from 'react';
import '@testing-library/jest-dom';

describe('ParamEditor', () => {
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

  it('отображает поля по params', () => {
    render(<ParamEditor params={params} model={initialModel} />);

    expect(screen.getAllByRole('textbox')).toHaveLength(params.length);
    expect(screen.getByText(/Назначение:/i)).toBeInTheDocument();
    expect(screen.getByText(/Длина:/i)).toBeInTheDocument();
  });

  it('инициализирует значения из model.paramValues', () => {
    render(<ParamEditor params={params} model={initialModel} />);

    const field1 = screen.getByLabelText(/Назначение:/i).parentElement!.querySelector('input')!;
    const field2 = screen.getByLabelText(/Длина:/i).parentElement!.querySelector('input')!;

    expect(field1).toHaveValue('повседневное');
    expect(field2).toHaveValue('макси');
  });

  it('корректно обновляет модель после изменений', () => {
    const editorRef = createRef<ParamEditor>();
    
    render(<ParamEditor ref={editorRef} params={params} model={initialModel} />);
      
    const editorInstance = editorRef.current!;

    const field1 = screen.getByLabelText(/Назначение:/i).parentElement!.querySelector('input')!;
    const field2 = screen.getByLabelText(/Длина:/i).parentElement!.querySelector('input')!;

    fireEvent.change(field1, { target: { value: 'новое значение 1' } });
    fireEvent.change(field2, { target: { value: 'новое значение 2' } });

    const updatedModel = editorInstance.getModel();

    expect(updatedModel).toEqual({
      paramValues: [
        { paramId: 1, value: 'новое значение 1' },
        { paramId: 2, value: 'новое значение 2' },
      ],
      colors: [],
    });
  });
});