/**
 * A field people never see and bots fill in. The form routes treat any value
 * as a bot: nothing is sent, and the bot is told it worked so it learns nothing.
 */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
