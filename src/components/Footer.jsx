export default function Footer() {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="flex justify-between items-center px-8">
        <span className="text-sm font-light">
          Copyright © {new Date().getFullYear()} || All Rights Reserved By
          SarimJafri
        </span>
        <div className="flex space-x-4">
          <a
            href="https://github.com/sarimjafri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sarimjafri/?originalSubdomain=in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
