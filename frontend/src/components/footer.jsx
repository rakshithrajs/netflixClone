export const Footer = () => {
    return (
        <footer>
            <div className="w-9/12 mx-auto h-10 mt-40 flex items-center">
                <p className="text-gray-300">
                    Questions?call{" "}
                    <a href="tel:000-800-919-1694">000-800-919-1694</a>
                </p>
            </div>
            <div className="text-gray-300 grid grid-cols-3 mx-auto w-9/12 mt-5 mb-5 max-md:grid-cols-2 gap-y-8 max-[640px]:grid-cols-1">
                <div>
                    <ul className="grid gap-y-3 underline">
                        <li>FAQ</li>
                        <li>Media center</li>
                        <li>Ways to Watch</li>
                        <li>Cookie Preferences</li>
                        <li>Speed Test</li>
                    </ul>
                </div>
                <div>
                    <ul className="grid gap-y-3 underline">
                        <li>Help Center</li>
                        <li>Investor Relations</li>
                        <li>Terms of Use</li>
                        <li>Corporate Information</li>
                        <li>legal Notices</li>
                    </ul>
                </div>
                <div>
                    <ul className="grid gap-y-3 underline">
                        <li>Account</li>
                        <li>Jobs</li>
                        <li>Privacy</li>
                        <li>Conatct Us</li>
                        <li>Only on Netflix</li>
                    </ul>
                </div>
            </div>
            <div className="flex items-center text-gray-300 w-9/12 mx-auto h-10 ">
                Netflix India
            </div>
        </footer>
    );
};
