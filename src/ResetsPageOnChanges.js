import isEqual from 'lodash/isEqual';

export default class {
  #previousValue;

  /**
   * Constucts a vue mixin that will reset the page number (or other parameters) on changes.
   *
   * @param {string} paramsProperty - property to watch and modify.
   * @param {array} ignoreProperties - array of properties to ignore changes to.
   * @param {object} resetProperties - Object of properties to 'reset' when a change is detected.
   */
  constructor(paramsProperty = 'params', ignoreProperties = ['page'], resetProperties = {page: 1})
  {
    this.paramsProperty = paramsProperty;
    this.ignoreProperties = ignoreProperties;

    this.watch = {
      [paramsProperty]: {
        deep: true,
        handler: val => {
          let cloneVal = {...val};
          for (let prop of ignoreProperties) {
            delete cloneVal[prop];
          }

          if (!isEqual(cloneVal, this.#previousValue)) {
            for (let [prop, value] of Object.entries(resetProperties)) {
              val[prop] = value;
            }
            this.#previousValue = cloneVal;
          }
        },
      },
    };
  }
}
