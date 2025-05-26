import { useState } from 'react'
// import React from 'react'

type FriendObj = {
  id: number
  name: string
  image: string
  balance: number
}

let initialFriends: FriendObj[] = []

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

function Button({
  children,
  onClick,
}: {
  children: string
  onClick: () => void
}) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  )
}

function Appts() {
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null as FriendObj | null)
  const [showAddFriend, setShowAddFriend] = useState(false)

  function handleSelection(friend: FriendObj) {
    setSelectedFriend((currentSelectedFriend: FriendObj | null) =>
      currentSelectedFriend?.id === friend.id ? null : friend
    )
    setShowAddFriend(false)
  }

  function handleAddFriend(friend: FriendObj) {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false)
  }

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show)
    setSelectedFriend(null) // note this line by me... AWESOME✅
  }

  function handleSplitBill(value: number) {
    setFriends((friends: FriendObj[]) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )

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
        <Button onClick={() => handleShowAddFriend()}>
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

function FriendsList({
  friends,
  onSelection,
  selectedFriend,
}: {
  friends: FriendObj[]
  onSelection: (friend: FriendObj) => void
  selectedFriend: FriendObj | null
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

function Friend({
  friend,
  onSelection,
  selectedFriend,
}: {
  friend: FriendObj
  onSelection: (friend: FriendObj) => void
  selectedFriend: FriendObj | null
}) {
  const isSelected = selectedFriend?.id === friend.id
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

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

function FormAddFriend({
  onAddFriend,
}: {
  onAddFriend: (friend: FriendObj) => void
}) {
  const [name, setName] = useState('')
  const [imageURL, setImageURL] = useState('https://i.pravatar.cc/48')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name || !imageURL) return // guard condition

    const id = Number(crypto.randomUUID()) // obtain random ID from the browser

    const newFriend: FriendObj = {
      id,
      name,
      image: `${imageURL}?=${id}`,
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
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type='text'
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />

      <Button onClick={() => handleSubmit}>Add</Button>
    </form>
  )
}

function FormSplitBill({
  selectedFriend,
  onSplitBill,
}: {
  selectedFriend: FriendObj
  onSplitBill: (value: number) => void
}) {
  const [bill, setBill] = useState(0)
  const [paidByUser, setPaidByUser] = useState(0)
  const paidByFriend = bill ? bill - paidByUser : 0
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!bill || !paidByUser) return
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return (
    <form
      className='form-split-bill'
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type='text'
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>👲 Your expense</label>
      <input
        type='text'
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type='text' disabled value={paidByFriend} />

      <label>😍 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button
        onClick={() =>
          onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
        }
      >
        Split bill
      </Button>
    </form>
  )
}
export default Appts
