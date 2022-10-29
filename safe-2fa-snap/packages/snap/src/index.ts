import {OnRpcRequestHandler} from '@metamask/snap-types';
import axios from 'axios';

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description: '2FA security',
            textInput: '2FA code',
          },
        ],
      });
      //
      // // eslint-disable-next-line no-case-declarations
      const response = axios.get('https://google.com');
      return response;
    default:
      throw new Error('Method not found.');
  }
};
