"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = ReactBootstrap.Button;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var FormGroup = ReactBootstrap.FormGroup;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Modal = ReactBootstrap.Modal;
var Panel = ReactBootstrap.Panel;
var PanelGroup = ReactBootstrap.PanelGroup;

var Recipe = function (_React$Component) {
  _inherits(Recipe, _React$Component);

  function Recipe() {
    _classCallCheck(this, Recipe);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Recipe.prototype.handleClick = function handleClick() {
    this.props.deleteRecipe(this.props.recipe);
  };

  Recipe.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "panelDiv" },
      React.createElement(
        "h4",
        null,
        "Ingredients"
      ),
      React.createElement(
        ListGroup,
        { fill: true },
        this.props.recipe.ingredients.map(function (ingredient) {
          return React.createElement(
            ListGroupItem,
            { className: "listItem" },
            ingredient
          );
        })
      ),
      React.createElement(
        Button,
        { bsStyle: "danger", onClick: this.handleClick.bind(this) },
        "Delete"
      ),
      React.createElement(RecipeModal, { recipeAction: this.props.editRecipe, initialRecipe: this.props.recipe, type: "Edit Recipe", bsStyle: "info" })
    );
  };

  return Recipe;
}(React.Component);

var RecipeBox = function (_React$Component2) {
  _inherits(RecipeBox, _React$Component2);

  function RecipeBox() {
    _classCallCheck(this, RecipeBox);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  RecipeBox.prototype.render = function render() {
    var editRecipe = this.props.editRecipe;
    var deleteRecipe = this.props.deleteRecipe;
    var keyCounter = 0;
    return React.createElement(
      "div",
      { className: "well" },
      React.createElement(
        PanelGroup,
        { accordion: true },
        this.props.recipes.map(function (recipe) {
          return React.createElement(
            Panel,
            { header: recipe.title, eventKey: ++keyCounter, role: "button", bsStyle: "info", className: "recipe" },
            React.createElement(Recipe, { recipe: recipe, editRecipe: editRecipe, deleteRecipe: deleteRecipe })
          );
        })
      )
    );
  };

  return RecipeBox;
}(React.Component);

var ModalForm = function (_React$Component3) {
  _inherits(ModalForm, _React$Component3);

  function ModalForm() {
    _classCallCheck(this, ModalForm);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  ModalForm.prototype.handleChange = function handleChange(e) {
    var text = e.target.value;
    var formType = e.target.placeholder == 'Recipe Name' ? 'title' : 'ingredients';
    this.props.changeRecipe(formType, text);
  };

  ModalForm.prototype.render = function render() {
    return React.createElement(
      "form",
      null,
      React.createElement(
        FormGroup,
        { controlId: "formBasicText" },
        React.createElement(
          ControlLabel,
          null,
          this.props.label
        ),
        React.createElement(FormControl, { type: "text", value: this.props.value, placeholder: this.props.placeholder, onChange: this.handleChange.bind(this) })
      )
    );
  };

  return ModalForm;
}(React.Component);

var RecipeModal = function (_React$Component4) {
  _inherits(RecipeModal, _React$Component4);

  function RecipeModal(props) {
    _classCallCheck(this, RecipeModal);

    var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this4.state = {
      recipe: React.addons.update(_this4.props.initialRecipe, {}), // creates a deep copy
      showModal: false
    };
    _this4.close = _this4.close.bind(_this4);
    _this4.open = _this4.open.bind(_this4);
    _this4.handleClick = _this4.handleClick.bind(_this4);
    _this4.changeRecipe = _this4.changeRecipe.bind(_this4);
    return _this4;
  }

  RecipeModal.prototype.close = function close() {
    this.setState({
      recipe: React.addons.update(this.props.initialRecipe, {}),
      showModal: false
    });
  };

  RecipeModal.prototype.open = function open() {
    this.setState({ showModal: true });
  };

  RecipeModal.prototype.handleClick = function handleClick() {
    this.props.recipeAction(this.props.initialRecipe, this.state.recipe);
    this.setState({ showModal: false });
  };

  RecipeModal.prototype.changeRecipe = function changeRecipe(formType, text) {
    var newRecipe = this.state.recipe;
    newRecipe[formType] = text.split(',');
    this.setState({ recipe: newRecipe });
  };

  RecipeModal.prototype.render = function render() {
    var btnText = this.props.type == 'Add Recipe' ? 'Add Recipe' : 'Edit';
    var title = this.props.type == 'Add Recipe' ? 'Add a Recipe' : 'Edit Recipe';
    var ingredientStr = this.state.recipe.ingredients.join(',');
    return React.createElement(
      "div",
      { className: "modalDiv" },
      React.createElement(
        Button,
        { bsStyle: this.props.bsStyle, bsSize: this.props.bsSize, onClick: this.open, className: "modalBtn" },
        btnText
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            title
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(ModalForm, { label: "Recipe", value: this.state.recipe.title, placeholder: "Recipe Name", changeRecipe: this.changeRecipe }),
          React.createElement(ModalForm, { label: "Ingredients", value: ingredientStr, placeholder: "Enter Ingredients,Separated,By Commas", changeRecipe: this.changeRecipe })
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { bsStyle: "primary", onClick: this.handleClick },
            this.props.type
          ),
          React.createElement(
            Button,
            { onClick: this.close },
            "Close"
          )
        )
      )
    );
  };

  return RecipeModal;
}(React.Component);

var Layout = function (_React$Component5) {
  _inherits(Layout, _React$Component5);

  function Layout() {
    _classCallCheck(this, Layout);

    var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this));

    Object.keys(localStorage).forEach(function (key) {
      if (key != '_phapp88_recipes') {
        localStorage.removeItem(key);
      }
    });
    var recipes = JSON.parse(localStorage.getItem('_phapp88_recipes')) == null ? [] : JSON.parse(localStorage.getItem('_phapp88_recipes'));
    _this5.state = {
      recipes: recipes
    };
    _this5.addRecipe = _this5.addRecipe.bind(_this5);
    _this5.deleteRecipe = _this5.deleteRecipe.bind(_this5);
    _this5.editRecipe = _this5.editRecipe.bind(_this5);
    return _this5;
  }

  Layout.prototype.addRecipe = function addRecipe(initialRecipe, recipe) {
    var newRecipes = this.state.recipes.concat(recipe);
    localStorage.setItem('_phapp88_recipes', JSON.stringify(newRecipes));
    this.setState({ recipes: newRecipes });
  };

  Layout.prototype.deleteRecipe = function deleteRecipe(recipe) {
    var newRecipes = this.state.recipes.filter(function (obj) {
      return !_.isEqual(obj, recipe);
    });
    localStorage.setItem('_phapp88_recipes', JSON.stringify(newRecipes));
    this.setState({ recipes: newRecipes });
  };

  Layout.prototype.editRecipe = function editRecipe(initialRecipe, recipe) {
    var newRecipes = this.state.recipes.map(function (obj) {
      return _.isEqual(obj, initialRecipe) ? recipe : obj;
    });
    localStorage.setItem('_phapp88_recipes', JSON.stringify(newRecipes));
    this.setState({ recipes: newRecipes });
  };

  Layout.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(RecipeBox, { recipes: this.state.recipes, editRecipe: this.editRecipe, deleteRecipe: this.deleteRecipe }),
      React.createElement(RecipeModal, { recipeAction: this.addRecipe, initialRecipe: { title: '', ingredients: [] }, type: "Add Recipe", bsSize: "large", bsStyle: "primary" })
    );
  };

  return Layout;
}(React.Component);

var app = document.getElementById('app');

ReactDOM.render(React.createElement(Layout, null), app);