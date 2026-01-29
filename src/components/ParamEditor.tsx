import { Component } from 'react';

export interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: any[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  static displayName = 'ParamEditor';
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((pv) =>
        pv.paramId === paramId ? { ...pv, value } : pv
      )
    }));
  };

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors
    };
  }

  render() {
    const { params } = this.props;
    
    return (
      <div className="param-editor">
        {params.map((param) => {
          const currentValue = this.state.paramValues.find(pv => pv.paramId === param.id)?.value || '';
          
          return (
            <div key={param.id}>
              <label htmlFor={`param-${param.id}`}>
                {param.name}:
              </label>
              {param.type === 'string' && (
                <input
                  type="text"
                  id={`param-${param.id}`}
                  value={currentValue}
                  onChange={(e) => this.handleChange(param.id, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ParamEditor;