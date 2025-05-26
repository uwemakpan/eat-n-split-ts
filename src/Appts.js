'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
Object.defineProperty(exports, '__esModule', { value: true })
var react_1 = require('react')
var initialFriends = []
initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]
function Button(_a) {
  var children = _a.children,
    onClick = _a.onClick
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  )
}
function Appts() {
  var _a = (0, react_1.useState)(initialFriends),
    friends = _a[0],
    setFriends = _a[1]
  var _b = (0, react_1.useState)(null),
    selectedFriend = _b[0],
    setSelectedFriend = _b[1]
  var _c = (0, react_1.useState)(false),
    showAddFriend = _c[0],
    setShowAddFriend = _c[1]
  function handleSelection(friend) {
    setSelectedFriend(function (currentSelectedFriend) {
      return (currentSelectedFriend === null || currentSelectedFriend === void 0
        ? void 0
        : currentSelectedFriend.id) === friend.id
        ? null
        : friend
    })
    setShowAddFriend(false)
  }
  function handleAddFriend(friend) {
    setFriends(function (friends) {
      return __spreadArray(__spreadArray([], friends, true), [friend], false)
    })
    setShowAddFriend(false)
  }
  function handleShowAddFriend() {
    setShowAddFriend(function (show) {
      return !show
    })
    setSelectedFriend(null) // note this line by me... AWESOME✅
  }
  function handleSplitBill(value) {
    setFriends(function (friends) {
      return friends.map(function (friend) {
        return friend.id ===
          (selectedFriend === null || selectedFriend === void 0
            ? void 0
            : selectedFriend.id)
          ? __assign(__assign({}, friend), { balance: friend.balance + value })
          : friend
      })
    })
    // Hide the selected form
    setSelectedFriend(null)
  }
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button
          onClick={function () {
            return handleShowAddFriend()
          }}
        >
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}
function FriendsList(_a) {
  var friends = _a.friends,
    onSelection = _a.onSelection,
    selectedFriend = _a.selectedFriend
  return (
    <ul>
      {friends.map(function (friend) {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        )
      })}
    </ul>
  )
}
function Friend(_a) {
  var friend = _a.friend,
    onSelection = _a.onSelection,
    selectedFriend = _a.selectedFriend
  var isSelected =
    (selectedFriend === null || selectedFriend === void 0
      ? void 0
      : selectedFriend.id) === friend.id
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you {friend.balance}€
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button
        onClick={function () {
          return onSelection(friend)
        }}
      >
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}
function FormAddFriend(_a) {
  var onAddFriend = _a.onAddFriend
  var _b = (0, react_1.useState)(''),
    name = _b[0],
    setName = _b[1]
  var _c = (0, react_1.useState)('https://i.pravatar.cc/48'),
    imageURL = _c[0],
    setImageURL = _c[1]
  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !imageURL) return // guard condition
    var id = Number(crypto.randomUUID()) // obtain random ID from the browser
    var newFriend = {
      id: id,
      name: name,
      image: ''.concat(imageURL, '?=').concat(id),
      balance: 0,
    }
    onAddFriend(newFriend) // add new friend to the list
    // clear form to defaults after submit
    setName('')
    setImageURL('https://i.pravatar.cc/48')
  }
  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>😍Friend Name</label>
      <input
        type='text'
        value={name}
        onChange={function (e) {
          return setName(e.target.value)
        }}
      />

      <label>🖼️ Image URL</label>
      <input
        type='text'
        value={imageURL}
        onChange={function (e) {
          return setImageURL(e.target.value)
        }}
      />

      <Button
        onClick={function () {
          return handleSubmit
        }}
      >
        Add
      </Button>
    </form>
  )
}
function FormSplitBill(_a) {
  var selectedFriend = _a.selectedFriend,
    onSplitBill = _a.onSplitBill
  var _b = (0, react_1.useState)(0),
    bill = _b[0],
    setBill = _b[1]
  var _c = (0, react_1.useState)(0),
    paidByUser = _c[0],
    setPaidByUser = _c[1]
  var paidByFriend = bill ? bill - paidByUser : 0
  var _d = (0, react_1.useState)('user'),
    whoIsPaying = _d[0],
    setWhoIsPaying = _d[1]
  function handleSubmit(e) {
    e.preventDefault()
    if (!bill || !paidByUser) return
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }
  return (
    <form
      className='form-split-bill'
      onSubmit={function (e) {
        return handleSubmit(e)
      }}
    >
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type='text'
        value={bill}
        onChange={function (e) {
          return setBill(Number(e.target.value))
        }}
      />

      <label>👲 Your expense</label>
      <input
        type='text'
        value={paidByUser}
        onChange={function (e) {
          return setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }}
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type='text' disabled value={paidByFriend} />

      <label>😍 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={function (e) {
          return setWhoIsPaying(e.target.value)
        }}
      >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button
        onClick={function () {
          return onSplitBill(
            whoIsPaying === 'user' ? paidByFriend : -paidByUser
          )
        }}
      >
        Split bill
      </Button>
    </form>
  )
}
export default Appts
//completed
