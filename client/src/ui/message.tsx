import { useUser } from "#/lib/useUser";

export default function Message({message}: any)  {
	// const { user } = useUser(); // the currently logged in user

	// function isMessageFromUser() {
    // return user?.id === message.user_id;
//   }
	
	return (
		<div className="block ml-2 text-sm text-gray-600">
			<div>
				{message.message}
			</div>
		</div>
	)
}