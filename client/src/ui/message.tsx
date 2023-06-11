import { useUser } from "#/lib/useUser";

export default function Message({message}: any)  {

	return (
        <div className={`flex ${message.sender == 'user' ? 'justify-self-end' : 'justify-self-start bg-gray-800 text-gray-900'} w-fit  items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-600 border-none rounded-md cursor-pointer focus:outline-none`}>
		<div className={`ml-2 text-sm flex text-gray-100`}>
			<div>
				{message.text}
			</div>
            </div>
		</div>
	)
}